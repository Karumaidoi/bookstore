/* eslint-disable object-shorthand */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */

import supabase from './supabase';

export async function getOAuthToken(data) {
  const phoneNumber = data?.Users.phone;
  const amount = data?.amount;
  const desc = data?.description;

  try {
    const res = await fetch('http://127.0.0.1:4400/api/v1/mpesa/mpesaPayment', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        phone: phoneNumber,
        amount: amount,
        description: desc,
      }),
    });
    const newData = await res.json();

    const { error } = await supabase.from('Orders').update({ status: 'done' }).eq('id', data?.id);

    if (error) {
      throw new Error(error.message);
    }

    return newData;
  } catch (err) {
    throw new Error(err);
  }
}
