const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const app = express();

admin.initializeApp({
	credential: admin.credential.cert(require('../firebase.json')),
});

app.use(cors());
app.use(express.json());

app.post('/user', async (req, res) => {
	try {
		const { firstName, lastName, email, password, role, phone, company } =
			req.body;
		console.log(company, phone);

		const snapshot = await admin
			.firestore()
			.collection('users')
			.where('email', '==', email)
			.get();
		if (!snapshot.empty)
			return res.status(400).json({
				status: 'Error',
				message: 'User with this Email already exists',
			});

		const phoneSnapshot = await admin
			.firestore()
			.collection('users')
			.where('phone', '==', phone)
			.get();
		if (!phoneSnapshot.empty)
			return res.status(400).json({
				status: 'Error',
				message: 'User with this Phone Number already exists',
			});

		const userRecord = await admin.auth().createUser({
			email,
			emailVerified: true,
			password,
			displayName: `${firstName} ${lastName}`,
			disabled: false,
		});

		const userDocRef = admin
			.firestore()
			.collection('users')
			.doc(userRecord.uid);

		const companyDocRef = admin.firestore().collection('company').doc(company);

		await userDocRef.set({
			email,
			firstName,
			lastName,
			role,
			phone,
			company: companyDocRef,
			_id: userRecord.uid,
		});
		await companyDocRef.update({
			users: admin.firestore.FieldValue.arrayUnion(userDocRef),
		});

		res.status(201).json({
			status: 'Success',
			message: 'User created successfully',
			userId: userRecord.uid,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send('Server Error');
	}
});

app.delete('/user/:userId', async (req, res) => {
	try {
		const userId = req.params.userId;

		await admin.auth().deleteUser(userId);
		console.log(`User with ID ${userId} deleted from Authentication`);

		const userDocRef = admin.firestore().collection('users').doc(userId);
		const getUserDoc = await userDocRef.get();

		if (!getUserDoc.exists) {
			return res.status(404).json({ error: 'User not found in Firestore' });
		}

		const userData = getUserDoc.data();
		const companyRef = admin
			.firestore()
			.collection('company')
			.doc(userData.company.id);
		if (!companyRef) {
			return res.status(404).json({ error: 'Company not found' });
		}
		await companyRef.update({
			users: admin.firestore.FieldValue.arrayRemove(userDocRef),
		});

		await userDocRef.delete();
		console.log(`User document ${userId} deleted from Firestore`);

		return res.status(200).json({
			status: 'Success',
			message: 'User Deleted Successfully',
		});
	} catch (error) {
		console.error('Error deleting user:', error);
		return res.status(500).json({ error: error.message });
	}
});

app.listen(3000, () => {
	console.log('server is running on port 3000');
});
