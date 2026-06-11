export interface BookingAddons {
    cancellation_cover?: boolean;
    sms_confirmation?: boolean;
}

export interface BookingReceiptData {
    booking_id: number | string;
    id?: number | string;
    ref_no?: string;
    created_at?: string;
    payment_intent_id?: string;
    transaction_id?: string;
    title?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    mobile?: string;
    product_name?: string;
    travelling_from?: string;
    service_provider?: string;
    service?: string;
    drop_off_date?: string;
    return_date?: string;
    no_of_days?: number | string;
    quote_amount?: number | string;
    discount?: number | string;
    booking_fee?: number | string;
    total_payable?: number | string;
    vehicle_make?: string;
    vehicle_model?: string;
    vehicle_colour?: string;
    vehicle_registration?: string;
    passengers?: string | number;
    depart_terminal?: string;
    depart_flight?: string;
    return_terminal?: string;
    return_flight?: string;
    addons?: BookingAddons;
    addons_total?: number;
    status?: string;
}
