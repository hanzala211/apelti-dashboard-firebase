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

app.listen(3000, () => {
	console.log('server is running on port 3000');
});
