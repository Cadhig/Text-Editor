import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  openDB('jate', 1, {
    upgrade(db) {
      db.put('jate', content)
    }
  })
};

export const getDb = async () => {
  openDB('jate', 1, {
    upgrade(db) {
      db.getAll('jate')
    }
  })
};

initdb();
