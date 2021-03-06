const uuid = require('uuid/v4');

test('POST /media cannot set id', async () => {
  expect.assertions(2);

  const res = await http.post(`${baseUrl}/media`, { id: 10383 });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the id column'
  });
});

test('POST /media cannot set updatedAt', async () => {
  expect.assertions(2);

  const res = await http.post(`${baseUrl}/media`, {
    updatedAt: new Date()
  });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the updatedAt column',
  });
});

test('POST /media cannot set createdAt', async () => {
  expect.assertions(2);

  const res = await http.post(`${baseUrl}/media`, {
    createdAt: new Date()
  });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the createdAt column',
  });
});

test('POST /media cannot set deletedAt', async () => {
  expect.assertions(2);

  const res = await http.post(`${baseUrl}/media`, {
    deletedAt: new Date()
  });

  expect(res.status).toEqual(400);

  const body = await res.json();
  expect(body).toMatchObject({
    error: 'Cannot set the deletedAt column',
  });
});


test('POST /media creates new Media successfully', async () => {
  expect.assertions(2);

  const { Container, Media } = db.models;

  const [name] = RM.genContainerNames(1);
  const [mediaName] = RM.genMediaNames(1);
  const container = await Container.create({
    id: uuid(),
    name,
    fullPath: `/${name}`
  });

  const res = await http.post(`${baseUrl}/media`, {
    name: mediaName,
    playlistIndex: 0,
    containerId: container.id,
  });

  expect(res.status).toEqual(201);

  const body = await res.json();
  expect(body).toMatchObject(
    expect.objectContaining({
      id: expect.any(String),
      name: mediaName,
      type: 'IMAGE',
      playlistIndex: 0,
      containerId: container.id,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    })
  );
});

