function getRandomSpecialCharacter(avoidAmbiguous = false, extraSpcialCharacters = false) {
    specialArray = ['!', '#', '$', '%', '*', '@', '^', "&"];
    ambiguousArray = ['"', '`', '\'', '/', '\\'];
    extraSpecialArray = ['(', ')', '+', '-', ':', ';', '<', '=', '>', '.', '[', ']', '_', '{', '|', '}', '~', '?'];

    if (!avoidAmbiguous) {
        specialArray.concat(ambiguousArray);
    }

    if (!extraSpcialCharacters) {
        specialArray.concat(extraSpecialArray);
    }

    return specialArray[Math.floor(Math.random() * specialArray.length)];
}

function getRandomLowercaseLetter(avoidAmbiguous = false) {
    letterArray = [];
    for (var i = 'a'.charCodeAt(); i <= 'z'.charCodeAt(); ++i) {
        if (!avoidAmbiguous ||
            (i != 'l'.charCodeAt() &&
            i != 'b'.charCodeAt() &&
            i != 'q'.charCodeAt() &&
            i != 'g'.charCodeAt() &&
            i != 'o'.charCodeAt() &&
            i != 's'.charCodeAt())
        ) {
            letterArray.push(String.fromCharCode(i));
        }
    }
    return letterArray[Math.floor(Math.random() * letterArray.length)];
}

function getRandomUppercaseLetter(avoidAmbiguous = false) {
    letterArray = [];
    for (var i = 'A'.charCodeAt(); i <= 'Z'.charCodeAt(); ++i) {
        if (!avoidAmbiguous ||
            (i != 'I'.charCodeAt() &&
            i != 'O'.charCodeAt() &&
            i != 'S'.charCodeAt())
        ) {
            letterArray.push(String.fromCharCode(i));
        }
    }
    return letterArray[Math.floor(Math.random() * letterArray.length)];
}

function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}

function scramble(string) {
    string = string.split('');
    for (i = 0; i < string.length; ++i) {
        j = Math.floor(Math.random() * (i + 1));
        [string[i], string[j]] = [string[j], string[i]];
    }
    return string.join('');
}

//TODO need to add a bad password checker even though bad passwords are unlikely
function generatePassword(
    length = 8,
    numbers = true,
    lowercase = true,
    uppercase = false,
    specials = false,
    minUppercase = 1,
    minSpecials = 1,
    avoidAmbiguous = false,
    extraSpecial = false
) {
    password = "";
    
    // generate minimum uppercase letters
    if (uppercase) {
        for (i = 0; i < minUppercase; ++i) {
            password += getRandomUppercaseLetter(avoidAmbiguous);
        }
    }
    
    // generate minimum special characters
    if (specials) {
        for (i = 0; i < minSpecials; ++i) {
            password += getRandomSpecialCharacter(avoidAmbiguous, extraSpecial);
        }
    }

    // return early if we are too long
    if (password.length >= length) {
        return password;
    }

    diff = length - password.length;

    // get array of all allowed characters
    types = []
    if (numbers) {
        types.push(getRandomNumber);
    }
    if (lowercase) {
        types.push(getRandomLowercaseLetter.bind(avoidAmbiguous));
    }
    if (uppercase) {
        types.push(getRandomUppercaseLetter.bind(avoidAmbiguous));
    }
    if (specials) {
        types.push(getRandomSpecialCharacter.bind(avoidAmbiguous, extraSpecial));
    }

    for (i = 0; i < diff; ++i) {
        password += types[Math.floor(Math.random() * types.length)]();
    }

    return scramble(password);

}
