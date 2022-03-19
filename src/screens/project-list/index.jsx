import { useState, useEffect } from 'react';
import List from './list';
import SearchPanel from './search-panel'
import * as qs from 'qs';
import {cleanObject,useMount,useDebounce} from "../../utils/index"



const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);
    const [param, setParam] = useState({ name: "", personId: "" });
    const debouncedParam=useDebounce(param,2000)
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async res => {
            if (res.ok) {
                setList(await res.json())
            }
        })
    }, [debouncedParam])
    useMount(() => {
        fetch(`${apiUrl}/users`).then(async res => {
            if (res.ok) {
                setUsers(await res.json())
            }
        })
    })
    return <>
        <SearchPanel users={users} setParam={setParam} param={param} />
        <List users={users} list={list} />
    </>
}