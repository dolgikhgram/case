const cols = document.querySelectorAll('.col')// Метод querySelectorAll() возвращает статический файл, представляющий список элементов документа, которые соответствуют указанной группе селекторов.
document.addEventListener('keydown', (event)=>{// Document Интерфейс представляет любую веб-страницу, загруженную в браузер, и служит точкой входа в содержимое веб-страницы, которое представляет собой дерево DOM.,addEventListener() Метод EventTarget интерфейса устанавливает функцию, которая будет вызываться всякий раз, когда указанное событие будет доставлено целевому объекту.
    event.preventDefault() //preventDefault() Метод Event интерфейса сообщает агенту пользователя, что если событие не обрабатывается явно, его действие по умолчанию не должно выполняться, как это обычно делается.
    if (event.code.toLowerCase() === 'space'){ // .code - возвращает название клавиши , на которую нажали ,, .toLowerCase() --- возвращает строку превращённую в нижний регистр , это нам нужно для сравнения 
        setRandomColors()
    }
})

document.addEventListener('click',(event)=>{
    const type = event.target.dataset.type // event.target--- участок по которому мы кликаем ,  dataset---это все элементы дата , type---- это тип который мы укахали html (data-type)
    
    if (type === "lock"){
        const node = 
            event.target.tagName.toLowerCase() === 'i' //Свойство tagName интерфейса, доступное только для чтения, Element возвращает имя тега элемента, для которого оно вызывается.
                ? event.target 
                : event.target.children[0] 
         node.classList.toggle('fa-lock-open')//не знаю почему , но в классе мы меняем только то , что пишется , через дефис 
         node.classList.toggle('fa-lock')//Element.classList Это свойство, доступное только для чтения, которое возвращает текущую DOMTokenList коллекцию class атрибутов элемента. Затем его можно использовать для управления списком классов.
                        
    } else if (type === "copy"){
        copyToClickbord(event.target.textContent)// .textContent Позволяет задавать или получать текстовое содержимое элемента и его потомков.
    }
})
function generateRandomColors (){ // функция генератор случайного цвета 
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6 ; i++ ){
        color = color + hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}
function setRandomColors(isInitial){
    const colors = isInitial ? getColorsFromHash() : []
    cols.forEach((col,index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')//contains() Метод Node интерфейса возвращает логическое значение, указывающее, является ли узел потомком данного узла
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        if (isLocked ){
            colors.push(text.textContent)//push() Метод Array экземпляров добавляет указанные элементы в конец массива и возвращает новую длину массива.
            return
        }
        
        const color = isInitial ? colors[index]
            ? colors[index]
            : chroma.random()
        : chroma.random()

        if (!isInitial){
            colors.push(color)
        }

        text.textContent = color 
        col.style.background = color // вызываем функцию как стиль css
        setTextColor(text,color)
        setTextColor(button,color)
    })
      updateColorsHash(colors)
}
function setTextColor(text,color){
const luminance = chroma(color).luminance()//  это констаннта выдаёт показатель яркости от 0 до 1 , если он меньше 0.5 , то это светлый цвет и наоборот
text.style.color = luminance>0.4 ? 'black' : 'white'  

}

function copyToClickbord(text){
    return navigator.clipboard.writeText(text) // navigator.clipboard Возвращает Clipboard объект, который предоставляет доступ для чтения и записи в системный буфер обмена. writeText() Метод Clipboard интерфейса записывает указанный текст в системный буфер обмена


}

function updateColorsHash(colors = []){
    document.location.hash = colors//Location Интерфейс представляет местоположение (URL) объекта, с которым он связан. Изменения, внесенные в него, отражаются на объекте, с которым он связан.hash Свойство Location интерфейса возвращает строку, содержащую '#' за которой следует идентификатор фрагмента URL—адреса - идентификатор страницы, на которую пытается быть нацелен URL-адрес.
    .map((col) => {
        return col.toString().substring(1)//substring() Метод String values возвращает часть этой строки от начального индекса до конечного индекса и исключая его, или до конца строки, если конечный индекс не указан.
    })
    .join('-')
}

function getColorsFromHash(){
    if (document.location.hash.length>1){
        return document.location.hash.substring(1).split('-').map((color)=>'#'+color)
    }
    return []
}

setRandomColors(true)