package com.ryhma_3.kaiku.utility;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * A Logger class for directing a stream of status info. From here data like 'this.UUID was authenticated' or 'user USER_ID sent message to users[]' can be monitored/stored.
 * @author Panu Lindqvist
 */
public class Logger {

	/**
	 * Logger access point. Send debug or status Strings here.
	 * @param data {@link String}
	 */
	public static void log(String data) {
		String timeStamp = new SimpleDateFormat("HH.mm").format(new Date());
		System.out.println(timeStamp + " || " + data);
	}
}
