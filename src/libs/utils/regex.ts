const regexUrlGoogleMap = (text: string) => {
    const regex = /https:\/\/www\.google\.com\/maps\/preview\/place\/[^\"]+/g;
    const matches = text.match(regex);

    if (matches) {
        return matches[0]
    } else {
        return null
    }
}

export {
    regexUrlGoogleMap
}