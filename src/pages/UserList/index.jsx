import {Spin} from 'antd';
import {useTranslation} from "react-i18next"
import {loadUser} from "@/api/apiCalls"
import {useCallback, useEffect, useState} from "react";
import {LoadingOutlined} from '@ant-design/icons';
import UserListItem from './UserListItem';
import {v4 as uuidv4} from 'uuid';

function UserList() {
    const {t} = useTranslation();
    const [apiProgress, setApiProgress] = useState(false);

    const [userPage, setUsersPage] = useState({
        content: [],
        number: 0,
        first: true,
        last: false
    });

    const getUsers = useCallback(async (page) => {
        setApiProgress(true);
        try {
            const response = await loadUser(page, 5);
            setUsersPage(response.data);
        } catch (error) {

        } finally {
            setApiProgress(false);
        }

    }, []);

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="card">
            <div className="card-header text-center fs-4">User List</div>
            <ul className="list-group  list-group-flush" id={"user-list-group"} key={123123}>
                {
                    userPage.content.map((user, key) => {
                        return (
                            <a className='text-decoration-none' key={uuidv4()} style={{textDecoration: "none"}}
                               href={`/user/${user.id}`}>
                                <UserListItem key={uuidv4()} user={user}/>
                            </a>
                        )
                    })
                }
            </ul>
            <div className="card-footer text-center">
                {
                    (!apiProgress && !userPage.first) &&
                    <button
                        className="btn btn-outline-secondary btn-sm float-start"
                        disabled={userPage.first}
                        onClick={() => getUsers(userPage.number - 1)}>
                        {t("preview")}
                    </button>
                }


                {
                    apiProgress && <Spin style={{display: apiProgress ? "inline" : "none"}}
                                         indicator={<LoadingOutlined style={{fontSize: 24, marginRight: 15}} spin/>}/>
                }
                {
                    (!apiProgress && !userPage.last) &&
                    <button
                        className="btn btn-outline-secondary btn-sm float-end"
                        disabled={userPage.last}
                        onClick={() => getUsers(userPage.number + 1)}>
                        {t("next")}
                    </button>
                }

            </div>
        </div>
    );
}

export default UserList;