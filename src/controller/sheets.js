import { GoogleSpreadsheet } from 'google-spreadsheet';

const doc = new GoogleSpreadsheet(process.env.REACT_APP_SPREADSHEET_ID);

const appendRow = async (orderDetails) => {
    try {
        await doc.useServiceAccountAuth(require('../data/hallyu-store-24df5c7f91dc.json'));

        // loads document properties and worksheets
        await doc.loadInfo();

        const sheet = doc.sheetsById[process.env.REACT_APP_SHEET_ID];
        const result = await sheet.addRow({
            'customer-name': orderDetails.name,
            'contact-number': orderDetails.contact,
            'email': orderDetails.email,
            'address': orderDetails.address,
            'delivery-option': orderDetails.delivery,
            'order-items': JSON.stringify(orderDetails.pendingOrders),
            'amount-receivable': orderDetails.amountToPay,
            'transaction-status': 'pending'
        });

        console.log('this is result', result);
<<<<<<< HEAD
        return result;
    } catch (e) {
        alert('Oh noes! Something went wrong.');
=======
    } catch (e) {
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
        console.error('Error: ', e);
    }
};

export { appendRow };