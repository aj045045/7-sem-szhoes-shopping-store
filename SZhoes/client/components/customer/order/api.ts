
export function TrackOrderData() {
    return [
        { date: '2024-08-01 ', time: '10:00 AM', title: "Placed order", status: 1, detail: 'The Order is placed and Payment has been received' },
        { date: '2024-08-02 ', time: '09:00 AM', title: "Ready for the Shipment", status: 1, detail: 'The Order is ready for the Shipment' },
        { date: '2024-08-02 ', time: '12:00 PM', title: "Shipment Delivered", status: 1, detail: 'The Shipment is ready to be picked up' },
        { date: '2024-08-03 ', time: '08:00 AM', title: "Out for Delivered", status: 2, detail: 'The Shipment has been processed in location' },
        { date: '2024-08-03 ', time: '03:00 PM', title: "Delivered", status: 2, detail: 'The Shipment has been delivered' },
    ];
}