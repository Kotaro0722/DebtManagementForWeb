import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  MenuItem,
  Paper,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  billing: z
    .string({ required_error: "Select your Billing Address" })
    .refine((value) => value !== "noSelection", {
      message: "Select your Billing Address",
    }),
  amount: z
    .string()
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Amount must be a number",
    })
    .refine((value) => value !== "0" && value !== "", {
      message: "Enter the Amount",
    }),
  message: z.string().optional(),
});

type FormSchema = z.infer<typeof schema>;

export const NewCredit = () => {
  const [billingOption, setBillingOption] = useState<string[]>([
    "田中太郎",
    "佐藤次郎",
  ]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({ resolver: zodResolver(schema), mode: "onChange" });

  const handleOnSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
  };

  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Paper
        sx={{
          width: "50%",
          height: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 5,
        }}
        component="form"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Box>
          <LabelTypography>Billing</LabelTypography>
          <Controller
            name="billing"
            control={control}
            defaultValue="noSelection"
            render={({ field }) => (
              <FormControl sx={{ width: "300px" }} error={!!errors.billing}>
                <Select {...field}>
                  <MenuItem value="noSelection">No Selection</MenuItem>
                  {billingOption?.map((option, index) => (
                    <MenuItem value={option} key={index}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {typeof errors.billing?.message === "string" && (
                  <FormHelperText>{errors.billing.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Box>
        <Box>
          <LabelTypography>Amount</LabelTypography>
          <Controller
            name="amount"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Amount"
                error={!!errors.amount}
                helperText={errors.amount?.message}
                sx={{ width: "300px" }}
              />
            )}
          />
        </Box>
        <Box>
          <LabelTypography>Message</LabelTypography>
          <Controller
            name="message"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="message"
                error={!!errors.message}
                helperText={errors.message?.message}
                sx={{ width: "300px" }}
              />
            )}
          />
        </Box>
        <Button
          type="submit"
          sx={{
            backgroundColor: "black",
            color: "white",
            width: "300px",
            height: "40px",
            borderRadius: "10px",
          }}
        >
          Submit
        </Button>
      </Paper>
    </Grid2>
  );
};

export const LabelTypography = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  marginBottom: "10px",
  fontWeight: "bold",
}));
