import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../context/user_context";
import DatePicker, {
	registerLocale,
	setDefaultLocale,
} from "react-datepicker";
import nl from "date-fns/locale/nl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	naam: z.string().min(1, { message: "Voer een naam in!" }),
	email: z
		.string()
		.min(1, { message: "Voer een emailadres in!" })
		.email({ message: "Voer een geldig email adres in!" }),
	telefoon: z
		.string()
		.min(1, { message: "Voer een telefoonnummer in!" })
		.length(10, {
			message: "Voer een geldig telefoonnummer in!",
		}),
});

const CustomerInfo = ({ setCurrentStep }) => {
	const { user, setUser, opmerking } = useUserContext();
	const checkDateForTime = (date) => {
		const currentDay = date.getDay();
		if (currentDay === 5) {
			return new Date(0, 0, 0, 18, 30);
		}
		if (currentDay === 6) {
			return new Date(0, 0, 0, 17, 0);
		}
		return new Date(0, 0, 0, 18, 0);
	};

	const setDateToTomorrow = () => {
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow;
	};
	const tomorrow = setDateToTomorrow();
	const [startDate, setStartDate] = useState(
		setDateToTomorrow(),
	);
	const [startTime, setStartTime] = useState(
		new Date(0, 0, 0, 9, 0),
	);
	const [endTime, setEndTime] = useState(
		checkDateForTime(startDate),
	);
	const [tempOpmerking, setTempOpmerking] =
		useState(opmerking);

	const handleDateChange = (date) => {
		const maxTime = checkDateForTime(date);
		setEndTime(maxTime);
		setStartDate(date);
	};

	const setTimeOnDateObject = () => {
		const hour = startTime.getHours();
		const minute = startTime.getMinutes();
		const tempDate = startDate;
		tempDate.setHours(hour);
		tempDate.setMinutes(minute);
		return tempDate;
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			naam: user.naam,
			email: user.email,
			telefoon: user.telefoon,
		},
		resolver: zodResolver(schema),
	});
	const onSubmit = (data) => {
		const datum = setTimeOnDateObject();
		const orderObject = {
			user: data,
			datum,
			opmerking: tempOpmerking,
		};
		setUser(orderObject);
		setCurrentStep(2);
	};

	return (
		<div className="wrapper info">
			<div className="info-container">
				<div className="container">
					<h2>Uw gegevens</h2>
				</div>
				<form
					spellCheck="false"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="row">
						{errors.naam ? (
							<div className="error-message">
								{errors.naam.message}
							</div>
						) : (
							<h4>Naam</h4>
						)}
						<input
							type="text"
							name="naam"
							placeholder="Naam"
							{...register("naam")}
						/>
					</div>
					<div className="row">
						{errors.email ? (
							<div className="error-message">
								{errors.email.message}
							</div>
						) : (
							<h4>Email</h4>
						)}
						<input
							type="text"
							name="email"
							placeholder="Email"
							{...register("email")}
						/>
					</div>
					<div className="row">
						{errors.telefoon ? (
							<div className="error-message">
								{errors.telefoon.message}
							</div>
						) : (
							<h4>Telefoon</h4>
						)}
						<input
							type="text"
							name="telefoon"
							placeholder="Telefoon"
							{...register("telefoon")}
						/>
					</div>
					<div className="row date">
						<h4>Datum</h4>
						<DatePicker
							minDate={tomorrow}
							dateFormat="dd MMMM"
							locale={nl}
							selected={startDate}
							onChange={(date) => handleDateChange(date)}
							filterDate={(date) =>
								date.getDay() !== 0 && date.getDay() !== 1
							}
						/>
					</div>
					<div className="row date">
						<h4>Tijd</h4>
						<DatePicker
							showTimeSelect
							showTimeSelectOnly
							minTime={new Date(0, 0, 0, 9, 0)}
							maxTime={endTime}
							selected={startTime}
							onChange={(date) => setStartTime(date)}
							// onChange={(e) => updateUserInfo("tijd", e)}
							// onFocus={() =>
							// 	updateUserInfo("tijd", new Date())
							// }
							// excludeTimes={[
							// 	setHours(setMinutes(new Date(), 0), 17),
							// 	setHours(setMinutes(new Date(), 30), 18),
							// 	setHours(setMinutes(new Date(), 30), 19),
							// 	setHours(setMinutes(new Date(), 30), 17),
							// ]}
							dateFormat="H:mm"
							locale={nl}
							timeIntervals={30}
						/>
					</div>
					<div className="row opmerking">
						<h4>Opmerkingen</h4>
						<textarea
							name="opmerking"
							id="opmerking"
							rows="5"
							placeholder="Opmerkingen"
							value={tempOpmerking}
							onChange={(e) =>
								setTempOpmerking(e.target.value)
							}
						></textarea>
					</div>
					<div className="buttons">
						<button
							className="btn btn-secondary"
							onClick={() => setCurrentStep(0)}
						>
							Terug
						</button>
						<button
							className="btn btn-primary"
							type="submit"
							// onClick={() => setCurrentStep(2)}
						>
							Doorgaan
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CustomerInfo;
