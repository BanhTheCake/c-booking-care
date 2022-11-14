import React from 'react'
import ContentLoader from 'react-content-loader'

const DoctorHourSkeleton = props => (
  <ContentLoader
    width={800}
    height={200}
    viewBox="0 0 800 200"
    backgroundColor="#f5f5f5"
    foregroundColor="#dbdbdb"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="130" height="36" />
    <rect x="0" y="50" rx="3" ry="3" width="130" height="36" />
    <rect x="0" y="100" rx="3" ry="3" width="130" height="36" />
    <rect x="140" y="50" rx="3" ry="3" width="140" height="36" />
    <rect x="140" y="100" rx="3" ry="3" width="140" height="36" />
    <rect x="290" y="50" rx="3" ry="3" width="140" height="36" />
    <rect x="290" y="100" rx="3" ry="3" width="140" height="36" />
    <rect x="0" y="150" rx="3" ry="3" width="430" height="10" />
    <rect x="0" y="175" rx="3" ry="3" width="430" height="10" />
    <rect x="450" y="0" rx="3" ry="3" width="5" height="300" />
    <rect x="480" y="50" rx="3" ry="3" width="200" height="10" />
    <rect x="480" y="70" rx="3" ry="3" width="350" height="10" />
    <rect x="480" y="90" rx="3" ry="3" width="350" height="10" />
    <rect x="480" y="110" rx="3" ry="3" width="350" height="36" />
    <rect x="480" y="156" rx="3" ry="3" width="350" height="36" />
  </ContentLoader>
)

export default DoctorHourSkeleton