import { groq } from "next-sanity";

// GROQ query to fetch all Carcino Pathway campaigns
export const CAMPAIGNS_QUERY = groq`
  *[_type == "campaign"] | order(startDate desc) {
    _id,
    title,
    "slug": slug.current,
    pathwayStage,
    status,
    summary,
    bannerImage,
    actionUrl,
    startDate,
    endDate,
    organizer->{
      name,
      image
    }
  }
`;

// GROQ query to fetch campaigns by specific Carcino Pathway stage
export const CAMPAIGNS_BY_STAGE_QUERY = groq`
  *[_type == "campaign" && pathwayStage == $stage] | order(startDate desc) {
    _id,
    title,
    "slug": slug.current,
    pathwayStage,
    status,
    summary,
    bannerImage,
    actionUrl,
    startDate,
    endDate,
    organizer->{
      name,
      image
    }
  }
`;

// GROQ query to fetch active Carcino Pathway campaigns
export const ACTIVE_CAMPAIGNS_QUERY = groq`
  *[_type == "campaign" && status == "active"] | order(startDate desc) {
    _id,
    title,
    "slug": slug.current,
    pathwayStage,
    status,
    summary,
    bannerImage,
    actionUrl,
    startDate,
    endDate
  }
`;
