import { db } from "@/db";
import {
  megaCenters,
  NewCourseSections,
  NewMegaCenter,
  sections,
  userSections,
} from "@/db/schema";
import { eq } from "drizzle-orm";

(async () => {
  const newCenters: NewMegaCenter[] = [
    // Church 1 - Rev Giorgio Antwi Adjei Mensah
    {
      name: "Agape MC",
      head: "Eld. Beverly Mensah",
      church: "Church 1",
      zonalPastor: "Rev Giorgio Antwi Adjei Mensah",
    },
    {
      name: "Dunamis MC",
      head: "Eld. Albright Adutwumwaa Kankam",
      church: "Church 1",
      zonalPastor: "Rev Giorgio Antwi Adjei Mensah",
    },
    {
      name: "New Testament MC",
      head: "Eld. Beatrice Djagah",
      church: "Church 1",
      zonalPastor: "Rev Giorgio Antwi Adjei Mensah",
    },
    {
      name: "Media SM",
      head: "Eugene Britwum",
      church: "Church 1",
      zonalPastor: "Rev Giorgio Antwi Adjei Mensah",
    },

    // Church 2 - Ps Akua Asare Ankomah
    {
      name: "Fruitful MC",
      head: "Ps. Adwoa Serwaa Boafo",
      church: "Church 2",
      zonalPastor: "Ps Akua Asare Ankomah",
    },
    {
      name: "Good news, MC",
      head: "Eld. Lydia Ewurama Kesse",
      church: "Church 2",
      zonalPastor: "Ps Akua Asare Ankomah",
    },
    {
      name: "Called Out MC",
      head: "Samuel Ohene Enin",
      church: "Church 2",
      zonalPastor: "Ps Akua Asare Ankomah",
    },

    // Church 3 - Ps Samuel Aikins
    {
      name: "Proton",
      head: "Eld. Koeman Tekpeh",
      church: "Church 3",
      zonalPastor: "Ps Samuel Aikins",
    },
    {
      name: "Machaira MC",
      head: "Eld. Enoch Kwofie",
      church: "Church 3",
      zonalPastor: "Ps Samuel Aikins",
    },
    {
      name: "Crucible of love",
      head: "Eld. Abena Amponsah Agyekum",
      church: "Church 3",
      zonalPastor: "Ps Samuel Aikins",
    },

    // Church 4 - Ps Audrey Nana Ama Essiam
    {
      name: "Ushering SM",
      head: "Ps. Paula Bakari",
      church: "Church 4",
      zonalPastor: "Ps Audrey Nana Ama Essiam",
    },
    {
      name: "Choir SM",
      head: "Ps. Adelita Afriyie Amoako",
      church: "Church 4",
      zonalPastor: "Ps Audrey Nana Ama Essiam",
    },
    {
      name: "Admin SM",
      head: "Eld. Amanda Arthur",
      church: "Church 4",
      zonalPastor: "Ps Audrey Nana Ama Essiam",
    },
    {
      name: "Children's Church",
      head: "Eld. Phebe Kayoung",
      church: "Church 4",
      zonalPastor: "Ps Audrey Nana Ama Essiam",
    },
    {
      name: "Teens Church",
      head: "Ps. Audrey Nana Ama Essiam",
      church: "Church 4",
      zonalPastor: "Ps Audrey Nana Ama Essiam",
    },
  ];

  const result = await db.insert(megaCenters).values(newCenters).returning();
  console.log(result);
})();
