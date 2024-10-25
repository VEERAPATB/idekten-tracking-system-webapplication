import Image from "next/image";
import React from "react";

const Card = (props: {
  name: string[] | undefined;
  IDT: string;
  company: boolean;
  nickname: string[] | undefined;
  role: string;
  email: string;
  department: string;
  employAccount: string;
  phone: string;
  image: string;
}) => {
  return (
    <div
      className="w-[1052px] h-[498px] relative overflow-hidden rounded-3xl bg-white"
      style={{ boxShadow: "3px 8px 15px 0 rgba(0,0,0,0.2)" }}
    >
      <div className="w-[346px] h-[111px]">
        <div className="w-[346px] h-[66px]">
          <p className="w-[346px] h-[29px] absolute left-[304px] top-28 text-2xl font-light text-left text-black/50">
            {(props.name ?? [])[0]}
          </p>
          <p className="w-[346px] h-[29px] absolute left-[304px] top-[149px] text-xl font-light text-left text-black/50">
            {(props.name ?? [])[1]}
          </p>
        </div>
        <p className="w-[346px] h-[29px] absolute left-[304px] top-[67px] text-2xl font-light text-left text-black/70">
          Name
        </p>
      </div>
      <div className="w-[346px] h-[111px]">
        <p className="w-[346px] h-[29px] absolute left-[706px] top-[67px] text-2xl font-light text-left text-black/70">
          Nickname
        </p>
        <div className="w-[346px] h-[66px]">
          <p className="w-[346px] h-[29px] absolute left-[706px] top-28 text-2xl font-light text-left text-black/50">
            {(props.nickname ?? [])[0]}
          </p>
          <p className="w-[346px] h-[29px] absolute left-[706px] top-[149px] text-xl font-light text-left text-black/50">
            {(props.nickname ?? [])[1]}
          </p>
        </div>
      </div>
      {props.company ? (
        <div className="w-[346px] h-[66px]">
          <p className="w-[346px] h-[29px] absolute left-[304px] top-[202px] text-2xl font-light text-left text-black/70">
            Company
          </p>
          <p className="w-[346px] h-[29px] absolute left-[304px] top-[239px] text-2xl font-light text-left text-black/50">
            IdekTep
          </p>
        </div>
      ) : (
        <></>
      )}
      <div className="w-[346px] h-[66px]">
        <p className="w-[346px] h-[29px] absolute left-[706px] top-[292px] text-2xl font-light text-left text-black/70">
          Phone
        </p>
        <p className="w-[346px] h-[29px] absolute left-[706px] top-[329px] text-2xl font-light text-left text-black/50">
            {props.phone}
        </p>
      </div>
      <div className="w-[346px] h-[66px]">
        <p className="w-[346px] h-[29px] absolute left-[304px] top-[382px] text-2xl font-light text-left text-black/70">
          Employee Account
        </p>
        <p className="w-[346px] h-[29px] absolute left-[304px] top-[419px] text-2xl font-light text-left text-black/50">
          {props.employAccount}
        </p>
      </div>
      <div className="w-[346px] h-[66px]">
        <p className="w-[346px] h-[29px] absolute left-[304px] top-[292px] text-2xl font-light text-left text-black/70">
          Email
        </p>
        <p className="w-[346px] h-[29px] absolute left-[304px] top-[329px] text-2xl font-light text-left text-black/50">
          veerapat.bunk@bumail.net
        </p>
      </div>
      <div className="w-[259px] h-[66px]">
        <p className="w-[259px] h-[29px] absolute left-[706px] top-[202px] text-2xl font-light text-left text-black/70">
          Department
        </p>
        <p className="w-[259px] h-[29px] absolute left-[706px] top-[239px] text-2xl font-light text-left text-black/50">
          {props.role}
        </p>
      </div>
      <p className="w-[166.75px] h-[32.91px] absolute left-10 top-[268px] text-xl font-[600] text-left text-black">
        IDT {props.IDT}
      </p>
      <div className="w-[199px] h-[199px] absolute left-[22.5px] top-[58.5px] rounded-[36px]">
        <Image 
            alt="profile-picture"
            src={props.image}
            fill
        />
      </div>
      <a href="#" className="absolute left-[965px] top-2.5 text-2xl font-light text-left text-[#c50f1f] border-b-2">
        edit
      </a>
    </div>
  );
};

export default Card;
