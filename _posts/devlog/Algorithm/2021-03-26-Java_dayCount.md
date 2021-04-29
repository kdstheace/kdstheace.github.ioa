---
layout: post
title: "[JAVA/下]今日は何日目（閏年含め）"
subtitle: "Java / Difficulty:下"
category: devlog
tags: algorithm
---

今まで何日目経ったのかを表します。
例）2021 年 3 月 26 日は 85 目の日になります。

```java
import java.util.Scanner;

// 윤년
//4로 나누어떨어짐, OR 100으로 나누어떨어지고 400으로 나눠떨어지지 않는 해.
//윤년은 29일, 평년은 28일
public class LeapYear {
	static int[][] mdays = {
			{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},
			{31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},
	};

	static int isLeap(int year) {
		return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0) ? 1 : 0;
	}

	static int dayOfYear(int year, int month, int day) {
				int dayCount = day;
		for(int i = 1; i < month; i++) {
			dayCount += mdays[isLeap(year)][i-1];
		}
		return dayCount;
	}

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int retry;
		do {
			System.out.println("入力した年月日まで何日経ったのかを出力します。");
			System.out.print("年: "); int year = sc.nextInt();
			System.out.print("月: "); int month = sc.nextInt();
			System.out.print("日: "); int day = sc.nextInt();

			System.out.println(dayOfYear(year, month, day) + "日経っています。");

			System.out.println("もう一度やりますか？　1．はい　2．いいえ");
			retry = sc.nextInt();

		} while (retry == 1);
	}
}
```
