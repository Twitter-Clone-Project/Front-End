import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../form-controls/Button';
import AddResults from './AddResults';
import AddCard from './AddCard';
import { ChatContext } from '../../hooks/ContactContext';
import BoxCard from '../BoxCard';

/**
 * Represents the Compose Page for creating new chats.
 *
 * Allows users to select recipients and compose new messages.
 * @component
 * @returns {JSX.Element} JSX for the Compose Page component.
 * @example
 * ```jsx
 *  <ComposePage />
 * ```
 */

export default function ComposePage() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [person, setPerson] = useState(null);
  const [persons, setPersons] = useState([]);
  const [deletePerson, setDeletePerson] = useState(null);
  const [ids, setIds] = useState([]);
  const { chatContext, setSocketMessages } = useContext(ChatContext);

  const [input, setInput] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (person) {
      const personsIndex = persons.findIndex(
        (personTemp) => personTemp.id === person.id,
      );

      if (personsIndex === -1) {
        setPersons([...persons, person]);
        setIds([...ids, person.id]);
      } else {
        const filteredPersons = persons.filter(
          (personTemp) => personTemp.id !== person.id,
        );
        const filteredIds = ids.filter((idTemp) => idTemp.id !== person.id);
        setIds(filteredIds);
        setPersons(filteredPersons);
      }
      setValue('');
      setInput('');
      setPerson(null);
    }
  }, [person]);

  useEffect(() => {
    if (deletePerson) {
      const filteredPersons = persons.filter(
        (personTemp) => personTemp.id !== deletePerson.id,
      );
      setPersons(filteredPersons);
      setDeletePerson(null);
    }
  }, [deletePerson]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    clearTimeout(timeoutId);
    const newTimeouId = setTimeout(() => {
      setValue(event.target.value);
    }, 400);
    setTimeoutId(newTimeouId);
  };

  const handleAdd = async () => {
    await fetch(
      `${import.meta.env.VITE_API_DOMAIN}conversations/startConversation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        origin: true,
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({
          userIds: ids,
        }),
      },
    );
    navigate(`/app/messages/`);
    window.location.reload();
  };

  return (
    <div
      data-testid="compose-page"
      className="absolute bottom-0 left-0 top-0 z-20 flex max-h-screen w-full items-center justify-center  md:bg-dark-gray md:bg-opacity-50"
    >
      <BoxCard
        header={
          <div className="absolute left-0 top-0 flex  h-[53px] w-full min-w-[300px] items-center">
            <button
              data-testid="compose-page-button"
              type="submit"
              onClick={() => {
                setSocketMessages([]);
                navigate(`/app/messages/${chatContext.contact.username}`);
              }}
              className="absolute left-3 top-5 h-[20px] w-[20px]  text-sm "
            >
              <svg
                viewBox="0 1 23 24"
                fill="#4a4a4c"
              >
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" />
              </svg>
            </button>
            <div className="absolute left-20 top-4  text-[20px] font-bold">
              New message
            </div>
            <div
              data-testid="compose-page-button-2"
              className=" absolute right-4 top-3 w-[70px]"
            >
              <Button
                onClick={handleAdd}
                backGroundColor={persons.length > 0 ? 'black' : 'white'}
                backGroundColorDark={persons.length > 0 ? 'white' : 'black'}
                borderColor="gray"
                label="Next"
                labelColor={persons.length > 0 ? 'white' : 'black'}
                labelColorDark={persons.length > 0 ? 'black' : 'white'}
              />
            </div>
          </div>
        }
      >
        <div className="flex flex-col ">
          <div className="flex flex-col border-b-[2px]  border-[#f6f8f9] dark:border-[#252829] dark:bg-black">
            <div className="mt-5 flex items-center gap-3 ">
              <div className="pl-4">
                <svg
                  viewBox="0 0 24 24"
                  className="h-[20px] w-[20px] fill-dark-gray"
                >
                  <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" />
                </svg>
              </div>
              <input
                className=" w-full p-3 outline-none dark:bg-black"
                placeholder="Search People"
                value={input}
                onChange={handleInputChange}
              />
            </div>
            <div
              data-testid="compose-page-addcard"
              className="
            mb-3  flex  max-h-[100px] flex-col gap-2 overflow-y-auto px-2 scrollbar-thin
            scrollbar-track-[#f9f9f9] scrollbar-thumb-[#c0c0c0]
            scrollbar-thumb-rounded-full hover:scrollbar-thumb-[#7b7b7b] dark:scrollbar-track-[#272727] dark:scrollbar-thumb-[#4a4a4a] dark:hover:scrollbar-thumb-[#888888]"
            >
              {persons.length > 0 &&
                persons.map((personTemp) => (
                  <AddCard
                    key={personTemp.id}
                    person={personTemp}
                    setDeletePerson={setDeletePerson}
                    persons={persons}
                  />
                ))}
            </div>
          </div>

          <div
            data-testid="compose-page-addresults"
            className="
            mt-3 flex max-h-[400px] flex-col overflow-y-auto scrollbar-thin
            scrollbar-track-[#f9f9f9] scrollbar-thumb-[#c0c0c0]
            scrollbar-thumb-rounded-full hover:scrollbar-thumb-[#7b7b7b] dark:scrollbar-track-[#272727] dark:scrollbar-thumb-[#4a4a4a] dark:hover:scrollbar-thumb-[#888888]"
          >
            <AddResults
              value={value}
              setPerson={setPerson}
              deletePerson={deletePerson}
            />
          </div>
        </div>
      </BoxCard>
    </div>
  );
}
