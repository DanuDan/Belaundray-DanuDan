const number_indo = (number) => {
    return new Intl.NumberFormat("de-DE").format(number);
}
export default number_indo