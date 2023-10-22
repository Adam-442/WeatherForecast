import * as React from "react";
import { Transition } from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import { Card, Grid, VariantProp } from "@mui/joy";

function SmallFrameworkCard(props: {title: string, image: string, link: string, description?: string}) {
    const [cardVariant, setCardVariant] = React.useState<VariantProp>('plain');

    return (
        <Card variant={cardVariant} onMouseOver={()=> setCardVariant('soft')} onMouseLeave={()=> setCardVariant('plain')} sx={{paddingBottom: "0.75rem", cursor: 'pointer'}}>
            <a href={props.link} target="_blank" className="flex flex-col items-center">
                <img src={props.image} alt={props.title} className="aspect-square w-24" />
                <p className="mt-5 font-bold text-center whitespace-nowrap max-sm:text-sm">{props.title}</p>
            </a>
        </Card>
    )
}

export default function FadeModalDialog() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <p
        onClick={() => setOpen(true)}
        className="text-xs font-light mt-3 cursor-pointer text-center text-[var(--joy-palette-primary-400)] hover:font-extrabold active:scale-75 transition-all"
      >
        MADE BY ADAM ABU SAAB
      </p>

      <Transition in={open} timeout={400}>
        {(state: string) => (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            onClose={() => setOpen(false)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: "none",
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: "blur(8px)" },
                    entered: { opacity: 1, backdropFilter: "blur(8px)" },
                  }[state],
                },
              },
            }}
            sx={{
              visibility: state === "exited" ? "hidden" : "visible",
            }}
          >
            <ModalDialog
              variant="plain"
              sx={{
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
            >
              <DialogTitle><p>Built By <a href="https://adamsaab.me" target="_blank" className="text-blue-500 font-bold hover:underline">ADAM ABU SAAB</a> Using:</p></DialogTitle>
              <DialogContent sx={{overflow: 'hidden'}}>
                <Grid container columns={3} spacing={1}>
                    <Grid xs={1}><SmallFrameworkCard title='React' image='https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' link="https://react.dev/"/></Grid>
                    <Grid xs={1}><SmallFrameworkCard title='Tailwind' image='https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' link="https://tailwindcss.com/"/></Grid>
                    <Grid xs={1}><SmallFrameworkCard title='Material UI' image='https://upload.wikimedia.org/wikipedia/commons/d/dc/Logo_material_design.svg' link="https://mui.com/"/></Grid>
                </Grid>
                <p className="text-center mt-2"> Animated icons from <a href="https://github.com/basmilius/weather-icons" target="_blank" className="font-bold">meteocons</a>.</p>
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}
