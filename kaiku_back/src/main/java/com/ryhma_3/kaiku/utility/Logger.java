package com.ryhma_3.kaiku.utility;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Logger {

	public static void log(String data) {
		String timeStamp = new SimpleDateFormat("HH.mm").format(new Date());
		System.out.println(timeStamp + " || " + data);
	}
}
