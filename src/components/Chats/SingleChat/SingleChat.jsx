import { textAlign } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addMessage, getMessage } from "../../../services/Message.service";
import { getDecodedToken } from "../../../services/users.service";
import { joinRoom, listenToMessages, sendMessage } from "../../../utils/socketUtils";
import CustomButton from "../../Utility/Button";
import { DashboardTable } from "../../Utility/DashboardBox";
import SearchBox from "../../Utility/SearchBox";
import { toastError } from "../../Utility/ToastUtils";
import { generateFilePath } from "../../Utility/utils";

export default function SingleChat() {
  const [chatArr, setChatArr] = useState([]);
  const params = useParams();
  const [message, setMessage] = useState("");

  const handleGetChatByChatId = async () => {
    try {
      let { data: res } = await getMessage(params.id);
      if (res.data) {
        console.log(res.data);
        setChatArr(res.data);
      }
    } catch (err) {
      toastError(err);
    }
  };

  const handleOnint = async () => {
    try {
      let tokenObj = await getDecodedToken();
      joinRoom(params.id);
      listenToMessages((data) => {
        console.log(data);
        if (tokenObj?.userId != data.senderId) {
          let tempObj = { ...data, chatId: data.roomId, message: data.message, sentByMe: false, userId: data.senderId };
          setChatArr((prevState) => {
            prevState.push(tempObj);
            return [...prevState];
          });
        }
        // readChatMessage();
        console.log("ASdADsADs");
      });
    } catch (error) {
      console.error(error)
    }

  };

  const handleSendMessageByChatId = async () => {
    try {
      if (message == "") {
        return;
      }
      let obj = {
        message,
      };
      let { data: res } = await addMessage(params.id, obj);
      if (res.success) {
        setMessage("");
        handleGetChatByChatId();
      }
    } catch (err) {
      toastError(err);
    }
  };

  const sendMessageToSocket = async () => {
    try {
      let tokenObj = await getDecodedToken();
      await sendMessage({ roomId: params.id, message });
      let tempArr = [...chatArr];
      tempArr.push({ message, chatId: params.id, userId: tokenObj?.userId, sentByMe: true });
      setChatArr([...tempArr]);
      setMessage("");
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    handleOnint();
    handleGetChatByChatId();
  }, []);

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <DashboardTable>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {chatArr &&
                    chatArr.length > 0 &&
                    chatArr.map((el, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            alignSelf: el.sentByMe ? "flex-end" : "flex-start",
                            textAlign: el.sentByMe ? "right" : "left",
                            width: "50%",
                            flexWrap: "wrap",
                            wordBreak: "break-all",
                            margin: "10px 0px",
                            padding: "15px 15px",
                            borderRadius: el.sentByMe ? "15px 15px 0px 15px" : "15px 15px 15px 0px",
                            backgroundColor: el.sentByMe ? "rgba(132, 163, 163,1)" : "rgba(166, 173, 173,0.3)",
                          }}
                        >
                          {el.messageType === 'image' ?
                            <a href={generateFilePath(el.message)} alt="file_image" target="_blank" rel="noreferrer">Click Here To Open</a>
                            :
                            el?.message
                          }

                          {/* <pre>
                            {JSON.stringify(el, null, 2)}
                          </pre> */}
                        </div>
                      );
                    })}
                </div>

                <textarea type="text" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} />

                <CustomButton
                  isBtn
                  iconName="fa-solid fa-plus"
                  btnName="Send"
                  ClickEvent={(e) => {
                    e.preventDefault();
                    sendMessageToSocket();
                  }}
                />
                {/* <DataTable columns={chats_columns} data={chats_data} pagination /> */}
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
