import React, { useEffect, useState } from 'react'
import { getSystemSetting, updateSystemSetting } from '../../services/system.service';
import CustomButton from '../Utility/Button'
import { DashboardBox } from '../Utility/DashboardBox'
import FileUpload from "../Utility/FileUpload";
import { toastError, toastSuccess } from '../Utility/ToastUtils';
import { generateFilePath } from '../Utility/utils';

export default function Emailconfig() {

    const [mailHost, setMailHost] = useState("")
    const [mailPort, setMailPort] = useState("")
    const [mailUserName, setMailUserName] = useState("")
    const [mailPassword, setMailPassword] = useState("")
    const [mailEncryption, setMailEncryption] = useState("")
    const [fromName, setFromName] = useState("")
    const [fromMail, setFromMail] = useState("")
    const [email, setEmail] = useState("")
    const [text, setText] = useState("")
    const [systemSetting, setSystemSetting] = useState([])
    const [systemSettingId, setSystemSettingId] = useState("")
    const [mailService, setMailService] = useState("");


    const handleGetAllUsers = async () => {

        try {
            const { data: res } = await getSystemSetting();
            setSystemSetting(res?.data[0]);
        } catch (error) {
            console.error(error);
        }

    };


    useEffect(() => {
        handleGetAllUsers();
    }, []);

    useEffect(() => {
        if (systemSetting) {

            setMailHost(systemSetting?.orderemailConfiguration?.host);
            setMailPort(systemSetting?.orderemailConfiguration?.port);
            setMailUserName(systemSetting?.orderemailConfiguration?.userName);
            setMailPassword(systemSetting?.orderemailConfiguration?.password);
            setMailEncryption(systemSetting?.orderemailConfiguration?.encryption);
            setFromName(systemSetting?.orderemailConfiguration?.fromName);
            setFromMail(systemSetting?.orderemailConfiguration?.fromEmail);
            setMailService(systemSetting?.orderemailConfiguration?.mailService);






            setSystemSettingId(systemSetting._id)
        }
    }, [systemSetting]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (`${mailHost}` == '') {
            toastError('mailHost Id is mandatory');
            return
        }




        if (`${mailUserName}` == '') {
            toastError('userName Id is mandatory');
            return
        }


        if (`${mailPassword}` == '') {
            toastError('password Id is mandatory');
            return
        }


        if (`${mailEncryption}` == '') {
            toastError('encryption Id is mandatory');
            return
        }

        if (`${fromName}` == '') {
            toastError('fromName Id is mandatory');
            return
        }

        if (`${fromMail}` == '') {
            toastError('fromMail Id is mandatory');
            return
        }
        if (`${mailService}` == '') {
            toastError('mailService Id is mandatory');
            return
        }


        let obj = {
            orderemailConfiguration: {
                host: mailHost,
                port: mailPort,
                userName: mailUserName,
                password: mailPassword,
                encryption: mailEncryption,
                fromName: fromName,
                fromEmail: fromMail,
                mailService: mailService,
            },
        }

        console.log(obj)


        try {
            const { data: res } = await updateSystemSetting(systemSettingId, obj)
            toastSuccess(res?.message);

            handleGetAllUsers();
        } catch (error) {
            toastError(error)
        }
    };


    const sendTestMail = (e) => {
        e.preventDefault();


        // if(`${name}` == ''){
        //   toastError('name is mandatory');
        //   return
        // }



        // let obj = {
        //   name,

        // };
        // if (mailTemplateId) {
        //   console.log(obj, "drt");
        //   dispatch(MailTemplateUpdate(mailTemplateId, obj));
        // } else {
        //   dispatch(MailTemplateAdd(obj));
        // }
        // dispatch(SetMailTemplateObj(null));
    };
    return (
        <main>
            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <h5 className="blue-1 mb-4">Email Settings</h5>
                            <DashboardBox>
                                <form action="" className="form row">
                                    <div className="col-md-6 mb-3">
                                        <label className="blue-1 fs-12">
                                            Mail Host<span className="red">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder=" Mail Host"
                                            className="form-control"
                                            value={mailHost}
                                            onChange={(event) => setMailHost(event.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="blue-1 fs-12">
                                            Mail Port<span className="red">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Mail Port"
                                            className="form-control"
                                            value={mailPort}
                                            onChange={(event) => setMailPort(event.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="blue-1 fs-12">
                                            Mail Username<span className="red">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder=" Mail Username"
                                            className="form-control"
                                            value={mailUserName}
                                            onChange={(event) => setMailUserName(event.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="blue-1 fs-12">
                                            Mail Password<span className="red">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Mail Password"
                                            className="form-control"
                                            value={mailPassword}
                                            onChange={(event) => setMailPassword(event.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="blue-1 fs-12">
                                            Mail Encryption<span className="red">*</span>
                                        </label>
                                        <select className='form-control' value={mailEncryption}
                                            onChange={(event) => setMailEncryption(event.target.value)}>
                                            <option value="">Please Select</option>
                                            <option value="ssl">SSL</option>
                                            <option value="tls">TLS</option>
                                        </select>

                                    </div>

                                    {/* <div className="col-md-6 mb-3">
                                        <label className="blue-1 fs-12">
                                            From Name<span className="red">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="From Name"
                                            className="form-control"
                                            value={fromName}
                                            onChange={(event) => setFromName(event.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="blue-1 fs-12">
                                            From Mail<span className="red">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="From Mail"
                                            className="form-control"
                                            value={fromMail}
                                            onChange={(event) => setFromMail(event.target.value)}
                                        />
                                    </div> */}
                                    <div className="col-md-6 mb-3">
                                        <label className="blue-1 fs-12">
                                            Mail Service<span className="red">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="From Mail"
                                            className="form-control"
                                            value={mailService}
                                            onChange={(event) => setMailService(event.target.value)}
                                        />
                                    </div>



                                    <div className="col-12 mt-3">
                                        <CustomButton
                                            isBtn
                                            iconName="fa-solid fa-check"
                                            btnName="Save"
                                            ClickEvent={handleSubmit}
                                        />
                                    </div>

                                    {/* <hr className='my-3' /> */}


                                    {/* <div className="col-md-12 mb-3">
                                        <label className="blue-1 fs-12">
                                            Send a Test Email to<span className="red">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Send a Test Email"
                                            className="form-control"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-12 mb-3">
                                        <label className="blue-1 fs-12">
                                            Mail Text<span className="red">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Mail Text"
                                            className="form-control"
                                            value={text}
                                            onChange={(event) => setText(event.target.value)}
                                        />
                                    </div>


                                    <div className="col-12">
                                        <CustomButton
                                            isBtn
                                            iconName="fa-solid fa-check"
                                            btnName="ADD"
                                            ClickEvent={sendTestMail}
                                        />
                                    </div> */}
                                </form>
                            </DashboardBox>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}
