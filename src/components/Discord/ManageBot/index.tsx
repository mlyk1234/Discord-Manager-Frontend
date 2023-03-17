import { useCallback, useEffect, useState } from "react";
import { Button, Drawer, Modal, Select, Table, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactComponent as Hexagon } from "../../../asset/common/hexagon.svg";
import { ReactComponent as Action } from "../../../asset/common/action.icon.svg";
import "./managebot.scss";
import axios, { AxiosError } from "axios";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import dayjs from "dayjs"
import backendUrl from "../../../shared/constant";

const useGetBotsApi = () => {
  const [data, setData] = useState<any[]>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getBots = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(`${backendUrl}/discord/bot`);
      if(result.data) {
        setData(result.data);
        setIsSuccess(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsSuccess(false);
    }
  }
  
  return {
    getBots,
    data,
    isSuccess,
    isLoading
  }
}

export default function ManageBot () {
    const [initialMBList, setInitialMBList] = useState<IBot[]>([]);
    const [opened, { open, close }] = useDisclosure(false);
    const [openedLogs, { open: openLogs, close: closeLogs }] = useDisclosure(false);
    const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);
    const [targetId, setTargetId] = useState<number | undefined>(undefined);
    const { getBots, data, isSuccess } = useGetBotsApi();
    
    useEffect(() => {
      if((data && data.length === 0) || !opened)
      {
        getBots();
      }
          
    }, [opened]);

    useEffect(() => {
      if(data && data.length > 0) {
        setInitialMBList(data)
      }
    }, [data]);

    const navigate = useNavigate();
    return (
        <>
            <div className="mb-root">
                <div className="mb-panel">

                </div>
                <div className="mb-list is-header">
                    <div className="mb-list-item is-header">
                        <div>Details</div>
                        <div className="cursor-pointer" onClick={open}>Add</div>
                    </div>
                </div>
                <div className="mb-list is-item">
                    {isSuccess && initialMBList && initialMBList.map((k, i) => 
                        <div className="mb-list-item">
                            {(() => {
                                const {settings} = k;
                                return <div className="data-item">
                                    <div className="grid-1">
                                        <div>
                                            <div className="value is-id">{k.acc_id}</div>
                                        </div>
                                        <div>
                                            <div className="label">Name</div>
                                            <div className="value">{k.username}</div>
                                        </div>
                                        <div>
                                            <div className="label">Email</div>
                                            <div className="value">{k.emailAddress}</div>
                                        </div>
                                    </div>
                                    <div className="grid-2">
                                        <div>
                                            <div className="label">Token</div>
                                            <div className="value">{k.loginToken}</div>
                                        </div>
                                        <div>
                                            <div className="label">Phone Number</div>
                                            <div className="value">{k.phoneNumber}</div>
                                        </div>
                                    </div>
                                    <div className="grid-action">
                                      <div onClick={() => {
                                        navigate({
                                          pathname: '/bot',
                                          search: `?acc_id=${k.acc_id}&loginToken=${k.loginToken}`
                                        }, {
                                          state: { acc_id: k.acc_id, loginToken: k.loginToken }
                                        })
                                      }} className="icon"><Action/></div>
                                      <div onClick={() => {
                                        setTargetId(k.acc_id);
                                        openLogs();
                                      }} className="icon"><Hexagon/></div>
                                    </div>
                                </div>
                            })()}
                        </div>
                    )}
                    {!isSuccess && initialMBList.length === 0 &&
                      <div className="flex flex-col justify-center items-center h-full w-full text-gray-400 font-medium">
                        No bot added...
                      </div>
                    }
                </div>
                <Drawer
                    id="addbot"
                    opened={opened} 
                    onClose={close}
                    position="right"
                    className="drawer-addbot"
                >
                    <AddBot/>
                </Drawer>
                <Drawer
                    id="addbot"
                    opened={openedLogs} 
                    onClose={closeLogs}
                    position="right"
                    className="drawer-addbot"
                >
                    <ViewLogs by_id={targetId}/>
                </Drawer>
                <Modal
                  size={"55rem"}
                  opened={openedModal}
                  onClose={closeModal}
                  withCloseButton={false}
                >
                  <div>Test</div>
                </Modal>
            </div>
            <div onClick={() => openLogs()} className="absolute bottom-0 text-white font-bold cursor-pointer rounded-3xl px-2" style={{background: 'rgb(0, 0, 0, 0.2)'}}>View Logs</div>
        </>
    )
}

const initialBotState: BaseBot = { 
  id: '', 
  username: '', 
  emailAddress: '', 
  phoneNumber: '' 
};

interface TableData {
  username: string,
  actionType: string,
  botAction: any,
  replyTo: any | null,
  timeStamp: string
}
const ViewLogs = ({by_id}: {by_id?: number | undefined}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<TableData[]>([]);
  useEffect(() => {
    getLogs()
  }, [])

  const getLogs = async () => {
    axios.get(`${backendUrl}/discord/logs/${by_id ? by_id?.toString() : ''}`).then((res) => {
      const { data } = res.data;
      if(data && data.length > 0) {
        let arrObj: TableData[] = [];
        data.forEach((item: any) => {
          arrObj.push({
            username: item.acc_data.username,
            actionType: item.text ? 'Text' : 'React',
            botAction: item.text || item.react,
            replyTo: item.reply_to ? item.reply_to : null,
            timeStamp: dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm A')
          })
        });
        setTableData(arrObj)
      }
    })
  }

  return (
    <div className="flex flex-col overflow-y-auto h-[600px]">
      <Table>
        <thead>
          <tr>
            <th>Bot Username</th>
            <th>Action Type</th>
            <th>Bot Action</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {tableData && tableData.length > 0 &&
            <>
              {tableData.map(i => 
                <tr key={i.username}>
                  <td>{i.username}</td>
                  <td>{i.actionType}</td>
                  <td>{i.botAction} {i.replyTo ? <div className="text-green-500">Reply to - {i.replyTo }</div>: null}</td>
                  <td>{i.timeStamp}</td>
                </tr>
              )}
            </>
          }
        </tbody>
      </Table>
    </div>
  )
}

const AddBot = () => {
    const form = useForm({
      initialValues: { loginToken: '' },
      validate: {
        loginToken: (v) => v === '' ? 'Enter Login Token' : null
      }
    })
    const [initialState, setInitialState] = useState<BaseBot>(initialBotState);
    const [show, setShow] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [isLoadingAddBot, setIsLoadingAddBot] = useState(false);
    const [isErrorAddBot, setIsErrorAddBot] = useState<string | null>(null);
    const checker = async () => {
        try {
            if(form.isValid()) {
              const result = await axios.post(`${backendUrl}/discord/verify-token`, {loginToken: form.values.loginToken});
              setInitialState(result.data);
              setShow(true);
              setInvalid(false);
            }
        } catch (error) {
            setInvalid(true);
        }
    }
    const save = async () => {
        try {
            setIsLoadingAddBot(true);
            const result = await axios.post(`${backendUrl}/discord/bot`, {
              loginToken: form.values.loginToken,
              role: role
            });
            setInitialState(result.data);
            setShow(true);
            setIsLoadingAddBot(false);
        } catch (error) {
            const err = error as AxiosError & any;
            setIsLoadingAddBot(false);
            setIsErrorAddBot(err.response.data.reason);
            console.log('error', error);
        }
    }
    const cancel = async () => {
      setInitialState(initialBotState)
      setShow(false);
      setIsErrorAddBot('');
    }
    const [role, setRole] = useState<string | null>(null);
    const onSelectRole = (v: string) => {
      setRole(v);
    }
    return (
        <div className="addbot-root">
            <form className="addbot-form" onSubmit={form.onSubmit(checker)} >
                <div className="input-wrapper">
                    <Text>Input Token</Text>
                    <TextInput {...form.getInputProps('loginToken')} radius={'xl'}/>
                </div>
                <Button disabled={show} type="submit" onClick={checker} radius={'xl'} className="dfa-btn-gradient">Check</Button>
            </form>

            <div className="addbot-result">
                <div>Results</div>
                <div>ID: {initialState.id}</div>
                <div>Name: {initialState.username}</div>
                <div>Email: {initialState.emailAddress}</div>
                <div>Phone Number: {initialState.phoneNumber}</div>
            </div>
            {invalid &&
              <div className="text-red-500 font-bold">Invalid Token</div>
            }
            {show &&
                <div className="addbot-form">
                    <Select
                      onChange={(v) => {
                        if(v) onSelectRole(v)
                      }}
                      radius={'xl'}
                      data={[{
                        value: "💻",
                        label: "💻 - Developer"
                      }, {
                        value: "👨‍🎓",
                        label: "👨‍🎓 - Student",
                      }, {
                        value: "💰",
                        label: "💰 - Investor"
                      }, {
                        value: "📈",
                        label: "📈 - Trader"
                      }, {
                        value: "👍",
                        label: "👍"
                      }]}
                      placeholder="Please select role for this bot"
                    />
                    <Button disabled={(isErrorAddBot || role === null) ? true : false} type="submit" onClick={save} radius={'xl'} className="dfa-btn-gradient">
                      {!isLoadingAddBot ? 'Add Bot' : 'Updating'}
                    </Button>
                    <Button type="submit" onClick={cancel} radius={'xl'} className="dfa-btn-gradient">Cancel</Button>
                </div>
            }
            {isErrorAddBot &&
              <div className="text-red-500 font-bold mt-2">{isErrorAddBot}</div>
            }
        </div>
    )
}

interface BotSettings {
    joinedGuild: string;
    guildName: string;
    listenChannel: string[];
    enabled: boolean;
}
  
export interface IBot {
    acc_id?: number;
    username: string;
    emailAddress: string;
    loginToken: string;
    phoneNumber: string;
    status: string;
    settings: BotSettings[];
}

interface BaseBot extends Omit<IBot, 'settings' | 'status' | 'loginToken'> {
    id: string
}

const sample: IBot[] = [
    {
      username: "zack",
      emailAddress: "zack@mail.com",
      loginToken: "aisjdiaojfafoansdfiasdnad.faiosjdfiaf",
      phoneNumber: "01839123213",
      status: "A",
      settings: [
        {
          joinedGuild: "123125123123213",
          guildName: "cbd",
          listenChannel: [
            "12381238901233"
          ],
          enabled: true
        }
      ]
    },
    {
      username: "john",
      emailAddress: "john@mail.com",
      loginToken: "alifjaifjaoifjaiofja.fjiafjaifjaf",
      phoneNumber: "01923212123",
      status: "B",
      settings: [
        {
          joinedGuild: "123125123123213",
          guildName: "abc",
          listenChannel: [
            "12381238901233",
            "2312312321312"
          ],
          enabled: false
        }
      ]
    },
    {
      username: "jane",
      emailAddress: "jane@mail.com",
      loginToken: "fjaifjaoifjafjaoif.fajifjaoifjaf",
      phoneNumber: "01921321312",
      status: "A",
      settings: [
        {
          joinedGuild: "2312312321312",
          guildName: "xyz",
          listenChannel: [
            "01923212123"
          ],
          enabled: true
        }
      ]
    },
    {
      username: "peter",
      emailAddress: "peter@mail.com",
      loginToken: "afaifjaoifjaoifj.fjafjaoifjaoif",
      phoneNumber: "01312123232",
      status: "B",
      settings: [
        {
          joinedGuild: "123125123123213",
          guildName: "def",
          listenChannel: [
            "2312312321312",
            "123125123123213"
          ],
          enabled: true
        }
      ]
    },
    {
      username: "mary",
      emailAddress: "mary@mail.com",
      loginToken: "foiajfoiafjoifjoif.jaoifjoaifjoai",
      phoneNumber: "01123123123",
      status: "A",
      settings: [
        {
          joinedGuild: "01921321312",
          guildName: "mno",
          listenChannel: [
            "2312312321312",
            "12381238901233"
          ],
          enabled: true
        }
      ]
    },
    {
        username: "adam",
        emailAddress: "adam@mail.com",
        loginToken: "aoifjoaijfoiajfoia.fjaofjaoifjaoif",
        phoneNumber: "01231231234",
        status: "B",
        settings: [
          {
            joinedGuild: "2312312321312",
            guildName: "hij",
            listenChannel: [
              "01921321312",
              "123125123123213"
            ],
            enabled: false
          }
        ]
      },
      {
        username: "sara",
        emailAddress: "sara@mail.com",
        loginToken: "jaoifjoaijfoiajfoi.fjaofjaoifjaof",
        phoneNumber: "01998765432",
        status: "A",
        settings: [
          {
            joinedGuild: "01921321312",
            guildName: "klm",
            listenChannel: [
              "01921321312",
              "12381238901233",
              "2312312321312"
            ],
            enabled: true
          }
        ]
      },
      {
        username: "dave",
        emailAddress: "dave@mail.com",
        loginToken: "joiajfioajfioajfioa.fjaofjaoifjoai",
        phoneNumber: "01333333333",
        status: "B",
        settings: [
          {
            joinedGuild: "123125123123213",
            guildName: "nop",
            listenChannel: [
              "12381238901233"
            ],
            enabled: false
          }
        ]
      }      
  ]