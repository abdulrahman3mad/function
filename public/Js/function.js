//DOM elements
let function_name = document.getElementById("function_name")
let function_area = document.getElementById("function_table")
let function_lang = document.getElementById("function_lang")

document.addEventListener("readystatechange", (e) => {
    if(document.readyState == "complete"){
        mainFunction()
    }
})

const mainFunction = async () => {
    result = await getData()
    setData(result)
}

const getData = async () => {
    const function_box = await axios.get(`${window.location}/data`)
    const result = await function_box.data
    return result
}

const setData = async (result) => {
    function_name.children[0].textContent = result.name
    function_lang.textContent = result.lang
    contentArray = await result.content
    modifyContent(contentArray)
}

const modifyContent = async (content) => {
    contentArray = await content.trim().split(/\n/)
    const tokens = ["void", "return", "const", "let", "var", "split", "trim", "await", "async", "document", "forEach", "document"]
    contentArray.forEach((data, index) => {
        row = document.createElement("tr")
        statementColumn = document.createElement("td")
        row.append(statementColumn)
        function_area.append(row)

        if(data.startsWith("//")){
            let span = document.createElement("span")
            span.textContent = data
            span.classList.add("comment")
            statementColumn.append(span)
            return
        }
        const regex = /[\s\.]/
        data = data.split(regex)
        console.log(data)
        data.forEach(word => {
            setRowData(word, tokens)
        })
    })
}

const setRowData = (word, tokens) => {
    span = document.createElement("span")
    span.textContent = word
    statementColumn.append(span)
    if(word == "="){
        span.style.padding="5px"
    }
    setRowPersonality(word,tokens)
}

const setRowPersonality = (word, tokens) => {
    tokens.forEach(token => {
        if(word == token){
            span.classList.add("token")
        }     
    })
} 
