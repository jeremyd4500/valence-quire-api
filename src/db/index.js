import admin from 'firebase-admin';
import serviceAccount from './firestore-key';

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

class DB {
	static db = admin.firestore();
	static collection = process.env.collection;

	static saveAccessObject = async (accessObj) => {
		try {
			await new Promise((resolve, reject) => {
				this.db
					.collection(this.collection)
					.doc('quire-access')
					.set({
						...accessObj
					})
					.then(() => resolve())
					.catch((err) => reject(err));
			});
			return;
		} catch (err) {
			return console.log(err);
		}
	};

	static getAccessObject = async () => {
		try {
			const response = await new Promise((resolve, reject) => {
				this.db
					.collection(this.collection)
					.doc('quire-access')
					.get()
					.then((doc) => resolve(doc.data()))
					.catch((err) => reject(err));
			});
			return response;
		} catch (err) {
			return console.log(err);
		}
	};
}

export default DB;
