    let aaa = `abcdef`;

    function strTest(str) {
        if (typeof str === 'string') {
            alert(true)
            return true;
        } else {
            return false;
        }
    }

    export {
        strTest
    };