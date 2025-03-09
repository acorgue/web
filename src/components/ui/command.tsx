"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";
import * as React from "react";

const Command = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive>) => (
  <CommandPrimitive
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
);
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({
  children,
  loop,
  shouldFilter,
  ...props
}: DialogProps &
  Pick<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive>,
    "shouldFilter" | "loop"
  >) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          shouldFilter={shouldFilter}
          loop={loop}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>) => (
  <div className="flex items-center px-3" cmdk-input-wrapper="">
    <SearchIcon className="mr-2 size-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
);

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
);

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = (
  props: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>,
) => <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />;

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
);

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>) => (
  <CommandPrimitive.Separator
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
);
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>) => (
  <CommandPrimitive.Item
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
);

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
