const checkDoubleDot = string => {
    let dotIndex = string.indexOf(".");
    for(let i = dotIndex;i<string.length-1;++i) {
        if(string.slice(i,i+1) === ".") {
            if(i === dotIndex+1) {
                return false
            } else {
                dotIndex = i;
            }
        }
    }
    return true
}
const validateEmail = email => {
    const indexOfAt = email.indexOf("@");
    const emLength = email.length;
    /// There must be only @, it's not the first character, and neither the last one
    if(indexOfAt !== email.lastIndexOf("@") || indexOfAt <= 0 || indexOfAt >= emLength - 4) {
        return false
    }
    //// Get user's name and top level domain, they are separated by @
    const userName = email.slice(0, indexOfAt+1);
    const tld = email.slice(indexOfAt+1, emLength);
    /// Check where are dots at 
    if(userName.indexOf(".") === 0 || userName.lastIndexOf(".") === indexOfAt-1) {
        return false
    }
    if(tld.indexOf(".") <= 0 || tld.lastIndexOf(".") === tld.length-1) {
        console.log(tld);
        return false
    }
    /// No dot stands by dot
    const emailNameCDD = checkDoubleDot(userName);
    const tldCDD = checkDoubleDot(tld);
    if(!emailNameCDD || !tldCDD) {return false};
    return true
}
module.exports = { validateEmail }