Date.prototype.addDays = function(days) {
  let dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  let dd = dat.getDate();
  let mm = dat.getMonth() + 1;
  let yyyy = dat.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  dat = yyyy + '-' + mm + '-' + dd;
  return dat;
};

const Utils = {
  timeToUnix(date) {
    let arr = date.split('');
    let year = arr[0] + arr[1] + arr[2] + arr[3];
    let month = arr[4] + arr[5];
    let day = arr[6] + arr[7];
    return new Date(year + '-' + month + '-' + day + ' 00:00:00').getTime();
  },

  contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return Array.prototype.filter.call(elements, function(element) {
      return RegExp(text).test(element.textContent);
    });
  },

  getRandom(from, to) {
    return Math.floor(from + Math.random() * (to - from));
  },

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },

  timeout(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(1);
        } catch (e) {
          reject(0);
        }
      }, delay);
    });
  },

  log() {
    let args = arguments;
    let str = '';
    for (let i = 0, l = args.length; i < l; i++) {
      if (i == 0) {
        str = args[i];
      } else {
        str = str + ', ' + args[i];
      }
    }
    let date = new Date();
    date = date + '';
    date = date.substring(0, date.length - 15);
    return console.log(date + ' : ', str);
  },
  getToday() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = yyyy + '' + mm + '' + dd;
    return today;
  },

  toDate(str) {
    let arr = str.split('');
    return arr[0] + arr[1] + arr[2] + arr[3] + '-' + arr[4] + arr[5] + '-' + arr[6] + arr[7];
  },

  getChar(a1, a2) {
    if (a1 <= 90 && a1 >= 65) {
      return String.fromCharCode(a1) + a2;
    } else if (a1 > 90 && a1 <= 116) {
      return String.fromCharCode(65) + String.fromCharCode(a1 - 26) + a2;
    } else if (a1 > 116) {
      return String.fromCharCode(66) + String.fromCharCode(a1 - 52) + a2;
    }
  },
};
module.exports = Utils;
