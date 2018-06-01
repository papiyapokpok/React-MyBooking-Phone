
export default {

//   signOut() {    
//       var cookies = document.cookie.split(";");
//           for (var i = 0; i < cookies.length; i++) {
//               var cookie = cookies[i];
//               var eqPos = cookie.indexOf("=");
//               var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//               document.cookie = 'staff_name=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//           }
//           firebase.auth().signOut().then(function() {
//             // Sign-out successful.
//           }).catch(function(error) {
//             // An error happened.
//           });
//       this.homePage()
//   },

  homePage() {
      window.location.href = '/'
  }

}