// import { db } from "./server/firebase_admin"
// import admin from 'firebase-admin';
// import { serverTimestamp } from 'firebase/firestore';

// const generate_tickets = async (_field: string, _amount: number) => {
//     const batch = db.batch();
//     const ticketCol = await db.collection('tickets');
    
//     for (let i = 1; i <= _amount; i++){
//         const ticketData = {
//             field: _field, 
//             index: i,
//             state: 'available',
//             purchaseID: "", // Will be filled on purchase. 
//             sold_at: admin.firestore.FieldValue.serverTimestamp(),
//         }
//         const docRef = ticketCol.doc(); // AutoGen ID.
//         batch.set(docRef, ticketData);
//     }

//     try {
//         await batch.commit();
//         console.log("SUCCESS! New tickets created");
//     } catch (error) {
//         console.log("Error creating new tickets: ", error);
//     }
// }

// export const gentickets = async () => {
//     generate_tickets("Red", 36);    // Red Section
//     generate_tickets("Green", 28);  // Green Section
//     generate_tickets("Yellow", 14); // Yellow Section
//     generate_tickets("Blue", 23);   // Blue Section
//     generate_tickets("Purple", 31); // Purple Section
// }
