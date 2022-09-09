import Link from "next/link";

export default function TwoUpProjectCard({project}) {
    const projectSLUG = project?.project?.url.slice(project?.project?.url.lastIndexOf("/"))
    return (
        <>
            <div className="pl-10 inline-block mb-1">
                <span className="text-3xl whitespace-nowrap">{project?.project?.content?.title}</span>
                {project?.contributors?.map((contributor, index) => {
                        return (
                            <span className="text-sm" key={`two-up-card-${index}`}> {contributor?.content?.artistname}{index === (project?.contributors.length - 1) ? "" : " | "}</span>
                        )
                    }
                )}
            </div>

            <div className="flex flex-nowrap">
                <p className="leading-4">{project?.project?.content?.projectdate.slice(0, 4)}&nbsp;</p>
                <div className="flex inline-block max-w-[92%]">
                    <div className="w-[48%]">
                        <Link href={`/projects${projectSLUG}`}>
                            <img className="cursor-pointer border border-black" src={project?.featureImages[0]?.url} />
                        </Link>
                    </div>
                    <div className="w-[48%] ml-auto">
                        {project?.featureImages[1]?.url &&
                            <Link href={`/projects${projectSLUG}`}>
                                <img className="cursor-pointer border border-black" src={project?.featureImages[1]?.url} />
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}