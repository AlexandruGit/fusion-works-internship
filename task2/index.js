function newPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const randomBoolean = Math.round(Math.random() * 10) % 2 === 0;
            return resolve(randomBoolean);
        }, 1000);
    });
};

var promises = [];
var results = {
    response: [] ,
    _true: 0 ,
    _false: 0
};

for (var i=0; i < 10; i++ ){
    promises.push(newPromise());
}
Promise.all(promises).then((r) => {
    results.response = r;
    results._true = r.filter(f => f === true).length;
    results._false = r.filter(f => f === false).length;

    console.log(results.response);
    console.log(results._true);
    console.log(results._false);
    
    localStorage.setItem('random_key', JSON.stringify(results));
});
