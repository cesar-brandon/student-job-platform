import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileRequest, ProfileValidator } from "@/lib/validators/profile";
import { Textarea } from "../ui/textarea";
import { User } from "@prisma/client";
import { AvatarUploader } from "../studio/settings/avatar-form";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function ProfileEditForm({
  user,
  setIsLoading,
  setOpen,
}: {
  user: User;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const form = useForm<ProfileRequest>({
    resolver: zodResolver(ProfileValidator),
    defaultValues: {
      bio: user.bio || "",
    },
  });

  const onSubmit = async (data: ProfileRequest) => {
    setIsLoading(true);
    try {
      await axios.patch(`/api/user/${user.id}/profile`, data);
      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado con éxito",
      });
      setOpen(false);
      router.refresh();
    } catch (error) {
      return toast({
        title: "Algo salió mal",
        description: "Ha ocurrido un error al actualizar tu presentación",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        id="profile-edit-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 mt-4"
      >
        <div className="w-full flex justify-center">
          <AvatarUploader user={user} />
        </div>
        {/* <div className="group relative w-24 h-28 rounded-lg overflow-hidden"> */}
        {/*   {user.image === null ? ( */}
        {/*     <div className="w-full h-full bg-muted-foreground dark:bg-background flex items-center justify-center"> */}
        {/*       <p className="text-white"> */}
        {/*         {simplifyName(user.name.toUpperCase())} */}
        {/*       </p> */}
        {/*     </div> */}
        {/*   ) : ( */}
        {/*     <Image */}
        {/*       src={user.image} */}
        {/*       alt="imagen de perfil" */}
        {/*       className="object-cover w-full h-full" */}
        {/*       width={100} */}
        {/*       height={100} */}
        {/*     /> */}
        {/*   )} */}
        {/*   <div */}
        {/*     className="absolute top-0 left-0 w-full h-full bg-background/50 backdrop-blur  */}
        {/*     opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity duration-300" */}
        {/*   > */}
        {/*     <SquarePlus className="w-6 h-6 text-accent-foreground" /> */}
        {/*   </div> */}
        {/* </div> */}

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Presentación</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escribe una presentación corta sobre ti"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <span
                className={cn(
                  `absolute bottom-2 right-2 text-sm text-foreground/40 bg-background/30 backdrop-blur-md
                      rounded-[0.5rem] px-2 py-1 border`,
                  field.value.length > 160 && "text-destructive",
                )}
              >
                {`${field.value.length}/160`}
              </span>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
