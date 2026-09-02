
export const activitiesQuery = `*[_type == "activity"] | order(date desc) {
  _id,
  "id": slug.current,
  title,
  category,
  date,
  description,
  content,
  "image": image.asset->url
}`;

export const galleryQuery = `*[_type == "gallery"] | order(date desc) {
  _id,
  title,
  category,
  date,
  "images": coalesce(
    images[].asset->url,
    select(
      defined(image) => [image.asset->url],
      []
    )
  )
}`;

export const homeQuery = `*[_type == "home"][0] {
  _id,
  name,
  role,
  heroText,
  "heroImage": heroImage.asset->url,
  location,
  locationText,
  aboutTitle,
  aboutText,
  "profileImage": profileImage.asset->url
}`;

export const achievementsQuery = `*[_type == "achievement"] | order(date desc) {
  _id,
  title,
  category,
  date,
  organization,
  description,
  "image": image.asset->url,
  link,
  featured
}`;

