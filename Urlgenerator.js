// 1st call

// Access Token Generated. Its valid for next 5 minutes.
//  Please fetch the access token by doing a GET operation
//   on this resource as instructed. Please check the instructions
//   given to you via email earlier for more details.

// 2nd call

// {
//     "accessToken": "4VOtI9WGLfc6QQpR-walidkhanjim%40gmail.com-yE9F1M5junyhFSiV",
//     "attempt": 2,
//     "accessTokenValidTillinUTC": "2021-10-29T03:25:59.523Z",
//     "instructions": {
//         "steps": {
//             "step1": "Congratulations! Please save your code as this will be needed in our later stage. As part of this URL response, you also get a 'urlObject' which has different properties",
//             "step2": "Construct the actual url by following this protocol by using various properties from the 'urlObject' : protocol://domain/path/resource",
//             "step3": "using the httpMethod as mentiond in the url do a REST call in the constructed URL. You need to give both of the API keys and access token in the header",
//             "step4": "header key for access token is 'accesstoken' and header key for api key is 'x-api-key' and add queryStringParameters like  protocol://domain/path/resource?email=your email",
//             "step5": "The access token is valid only for 5 minutes and once it is expired you need to regenerate the token again. You can generate token only 10 times",
//             "step6": "You will get information about more steps once you have do a successful REST call to the URL you just constructed as per step2"
//         },
//         "urlObject": {
//             "protcol": "https",
//             "domain": "todn22mvx9.execute-api.ap-south-1.amazonaws.com",
//             "path": "dev",
//             "resource": "screeningForm",
//             "httpMethod": "GET"
//         }
//     }
// }

// 3rd call
// {
//     "instructions": "Impressive! Kudos to you that you are in this step.
//     With this response, you have a stringified array of strings as
//     part of urlObject property. As part of this step you need to find
//      the actual URL from the urlObject. \n
//      Now you must be wondering how you will find that?
//       We will now tell you how we actually created
//      this urlObject so that you can do reverse engineering
//      to get it back. On the very first step,
//      we encoded the actual URL using base64 encoding. Then
//      we split the base64 encoded URL for every 50 characters \n
//      o get an array of strings. Then we have randomly shuffled
//      the array so the orders become random. Then we have
//      stringified the array of strings and sent you as
//      part of urlObject property.\n
//      Now please try to find out the correct URL.
//       Don't try to find it manually and rather write
//        a code in your favorite language to find it easily. \n
//        Once you have found the correct URL, paste it into a
//        browser and from there you will get the next instruction :-)\n
//         All the best!",
//     "urlObject": "[\"aGFuamltJTQwZ21haWwuY29tLXlFOUYxTTVqdW55aEZTaVYmZW\",
//     \"50cnkuMTAxMzkwOTE1PTRWT3RJOVdHTGZjNlFRcFItd2FsaWRr\",
//     \"50cnkuMTk1NDA1MDMwND13YWxpZGtoYW5qaW1AZ21haWwuY29t\",
//     \"b2xHcGxablNvLUw2akFBL3ZpZXdmb3JtP3VzcD1wcF91cmwmZW\",
//     \"lwUUxTZS1nQUx1eFBKanJPVEZ2MnpCX0FSQVFBbEtGRHlYdTVS\",
//     \"aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQU\"]"
// }

var atob = require('atob');
const axios = require('axios').default;
var inputArray = [
  'aGFuamltJTQwZ21haWwuY29tLXlFOUYxTTVqdW55aEZTaVYmZW',
  '50cnkuMTAxMzkwOTE1PTRWT3RJOVdHTGZjNlFRcFItd2FsaWRr',
  '50cnkuMTk1NDA1MDMwND13YWxpZGtoYW5qaW1AZ21haWwuY29t',
  'b2xHcGxablNvLUw2akFBL3ZpZXdmb3JtP3VzcD1wcF91cmwmZW',
  'lwUUxTZS1nQUx1eFBKanJPVEZ2MnpCX0FSQVFBbEtGRHlYdTVS',
  'aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC9lLzFGQU',
];

var result = inputArray.reduce(function permute(res, item, key, arr) {
  return res.concat(
    (arr.length > 1 &&
      arr
        .slice(0, key)
        .concat(arr.slice(key + 1))
        .reduce(permute, [])
        .map(function (perm) {
          return [item].concat(perm);
        })) ||
      item
  );
}, []);

var newarr = [];
for (let i of result) {
  let flag = '';
  for (let j = 0; j < i.length; j++) {
    flag += i[j];
  }
  newarr.push(flag);
}

newarr.map(async (url) => {
  var decodedString = atob(url);
  await axios
    .get(decodedString)
    .then((res) => {
      if (res.status === 200) {
        console.log('yes', decodedString);
      }
    })
    .catch(e);
});
