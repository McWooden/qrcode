export default function HideName(prop = 'fooBar') {
    return <div className="w-full justify-center flex flex-wrap gap-2">
        {prop.name.split(' ').map((e, i) => {
            let firstThreeLetters = i === 0 ? e.slice(0, 3) : e.slice(0, 1)
            let restOfWord = i === 0 ? e.slice(3) : e.slice(1)
            return <p key={i} className="p-1">{firstThreeLetters}{restOfWord.split('').map((e,i) => <span key={i} className="bg-neutral-300 text-neutral-300 first:rounded-s last:rounded-e select-none">{e}</span>)}</p>
        })}
    </div>
}