import superagent from 'superagent';

export async function get(url: string) {
    return await superagent.get(url);
}

export async function post(url: string, data: any) {
    return await superagent.post(url).send(data).set('Content-Type', 'application/json');
}

export async function del(url: string) {
    return await superagent.delete(url);
}