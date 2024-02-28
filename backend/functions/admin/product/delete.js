import handler from '../../util/handler';

export const main = handler(async (event) => {
    console.log(event);

  return {
    statusCode: 200,
    body: `Product Delete Handler`,
  };
});
