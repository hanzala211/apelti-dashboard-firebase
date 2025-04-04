const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const { FieldValue } = require('firebase-admin/firestore');
const cors = require('cors');
const credential = require('../firebase.json');
admin.initializeApp({
	credential: admin.credential.cert(credential),
});
const corsMiddleware = cors({ origin: true });

module.exports.createUser = onRequest((req, res) => {
	corsMiddleware(req, res, async () => {
		if (req.method !== 'POST') {
			return res.status(405).send('Only POST requests are accepted');
		}

		try {
			const data = req.body.data;

			const emailSnapshot = await admin
				.firestore()
				.collection('users')
				.where('email', '==', data.email)
				.get();
			if (!emailSnapshot.empty) {
				return res.status(400).json({
					status: 'Error',
					message: 'User with this Email already exists',
				});
			}

			const phoneSnapshot = await admin
				.firestore()
				.collection('users')
				.where('phone', '==', data.phone)
				.get();
			if (!phoneSnapshot.empty) {
				console.log('User with this phone already exists.');
				return res.status(400).json({
					status: 'Error',
					message: 'User with this Phone Number already exists',
				});
			}

			const userRecord = await admin.auth().createUser({
				email: data.email,
				emailVerified: true,
				password: data.password,
				displayName: `${data.firstName} ${data.lastName}`,
				disabled: false,
			});

			const userDocRef = admin
				.firestore()
				.collection('users')
				.doc(userRecord.uid);
			const companyDocRef = admin
				.firestore()
				.collection('company')
				.doc(data.company);

			await userDocRef.set({
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				role: data.role,
				phone: data.phone,
				company: companyDocRef,
				_id: userRecord.uid,
			});

			await companyDocRef.update({
				users: FieldValue.arrayUnion(userDocRef),
			});

			return res.status(200).json({
				status: 'Success',
				data: 'User created successfully',
			});
		} catch (error) {
			console.error('Error creating user:', error);
			return res.status(500).send('Server Error');
		}
	});
});

module.exports.deleteUser = onRequest((request, response) => {
	corsMiddleware(request, response, async () => {
		if (request.method !== 'POST') {
			return response.status(405).send('Only POST requests are accepted');
		}
		try {
			console.log(request.body);
			const userId = request.body.data;
			if (!userId) {
				return response.status(400).json({ error: 'userId is required' });
			}

			await admin.auth().deleteUser(userId);
			console.log(`User with ID ${userId} deleted from Authentication`);

			const userDocRef = admin.firestore().collection('users').doc(userId);
			const userSnapshot = await userDocRef.get();

			if (!userSnapshot.exists) {
				return response
					.status(404)
					.json({ error: 'User not found in Firestore' });
			}

			const userData = userSnapshot.data();

			if (!userData?.company || !userData.company.id) {
				return response
					.status(404)
					.json({ error: 'Company not found for this user' });
			}

			const companyRef = admin
				.firestore()
				.collection('company')
				.doc(userData.company.id);
			const companySnapshot = await companyRef.get();

			if (!companySnapshot.exists) {
				return response
					.status(404)
					.json({ error: 'Company not found in Firestore' });
			}

			await companyRef.update({
				users: FieldValue.arrayRemove(userDocRef),
			});

			await userDocRef.delete();
			console.log(`User document ${userId} deleted from Firestore`);

			return response.status(200).json({
				status: 'Success',
				message: 'User Deleted Successfully',
			});
		} catch (error) {
			console.error('Error deleting user:', error);
			return response.status(500).json('Server Error');
		}
	});
});
