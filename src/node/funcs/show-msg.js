let times = 1

export function showMsg(file, params) {
    // console.clear()
    const STACK = []

    const date = new Date()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()

    h = h < 10 ? "0" + h : h
    m = m < 10 ? "0" + m : m
    s = s < 10 ? "0" + s : s

    STACK.push(`[${h}:${m}:${s}] Number of updates: ${times++}`)
    STACK.push(`-------------------`)

    if (file) {
        let upd_file = file.replaceAll('\\', '/');
        STACK.push(`'${upd_file}' was changed.`);
    }
    if (params.output) {
        let out_file = params.output.replaceAll(/\.+\//g, '');
        STACK.push(`'${out_file}' updated successfully.`)
    }

    STACK.push(`-------------------`)
    
    if (params.watch) {
        STACK.push(`Waiting for changes...`)
    }
    
    console.log(`\n${STACK.join("\n")}\n`);
}