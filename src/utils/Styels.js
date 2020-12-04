export function s(...classes) {
    return classes.join(' ')
}

export function sif(classes) {
    return Object.entries(classes).filter(([k, v]) => v).map(([k, v]) => k).join(' ');
}

export function S(...classesNames) {
    const classes = classesNames
    const sfunction = function () {
        return classes.join(' ')
    }

    sfunction.add = (className) => {
        if (!classes.includes(className)) {
            classes.push(className)
        }
        return sfunction
    }

    sfunction.remove = (className) => {
        const position = classes.indexOf(className)
        if (position !== -1) classes.splice(position, 1)
        return sfunction
    }

    sfunction.toggle = (className) => {
        const position = classes.indexOf(className)
        if (position !== -1) classes.splice(position, 1)
        else classes[classes.length] = className
        return sfunction
    }

    return sfunction
}