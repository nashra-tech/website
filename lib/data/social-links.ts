export const socialPlatforms = [
    { name: 'Instagram', icon: 'instagram' },
    { name: 'LinkedIn', icon: 'linkedin' },
    { name: 'X (Twitter)', icon: 'twitter' },
    { name: 'Threads', icon: 'threads' },
    { name: 'YouTube', icon: 'youtube' },
    { name: 'TikTok', icon: 'tiktok' },
    { name: 'Facebook', icon: 'facebook' },
    { name: 'Dribbble', icon: 'dribbble' },
    { name: 'Behance', icon: 'behance' },
    { name: 'Medium', icon: 'medium' },
    { name: 'GitHub', icon: 'github' },
    { name: 'Personal Website', icon: 'globe' },
];

export function getSocialPlatformByName(name: string) {
    return socialPlatforms.find(platform => platform.name.toLowerCase() === name.toLowerCase());
}