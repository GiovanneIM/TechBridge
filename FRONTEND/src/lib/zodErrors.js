export function nestErrors(errors) {
    const result = {};

    for (const key in errors) {
        const keys = key.split('.');
        let current = result;

        keys.forEach((k, i) => {
            if (i === keys.length - 1) {
                current[k] = errors[key];
            } else {
                current[k] = current[k] || {};
                current = current[k];
            }
        });
    }

    return result;
}