import { getToday } from '../utils/helpers';
import supabase, { supabaseUrl } from './supabase';

export async function getBooks() {
  const { data, error } = await supabase
    .from('Books')
    .select('*, Users(*)', { count: 'exact' })
    .order('id', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteOrder(id) {
  const { error } = await supabase.from('Books').delete().eq('id', id);

  if (error) throw new Error(error.message);
}

export async function createBook(newBook) {
  const bookName = `${Math.random()}-${newBook.image.name}`.replaceAll('/', '');

  const bookPath = `${supabaseUrl}/storage/v1/object/public/bookImages/${bookName}`;

  const { data, error } = await supabase.from('Books').insert([{ ...newBook, image: bookPath }]);

  if (error) {
    throw new Error(error.message);
  }

  const { error: storageError } = await supabase.storage.from('bookImages').upload(bookName, newBook.image, {
    cacheControl: '3600',
    upsert: false,
  });

  if (storageError) {
    console.log(storageError);
    throw Error('Course Files could not be created');
  }

  return data;
}

export async function getBooksByDate(date) {
  const { data, error } = await supabase
    .from('Books')
    .select()
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateOrder(newOrder) {
  const orderUpdated = newOrder.newBook;
  const { orderId } = newOrder;

  console.log(orderId, orderUpdated);

  const { data, error } = await supabase.from('Books').update(orderUpdated).eq('id', orderId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
