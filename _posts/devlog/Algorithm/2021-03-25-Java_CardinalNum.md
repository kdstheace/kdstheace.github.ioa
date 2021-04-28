---
layout: post
title: "[JAVA/下]基数変換 with Array Only"
subtitle: "Java / Difficulty:下"
category: devlog
tags: algorithm
---

```java
import java.util.Scanner;

public class CardConvRev {
	static int cardConvR(int x, int r, char[] d) {
		int digits = 0;
		String dchar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		do {
			d[digits++] = dchar.charAt(x % r);
			x /= r;

		} while (x != 0);
		return digits;
	}

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int no; 	//변환하는 정수
		int cd; 	// 기수
		int dno; 	// 변환 후의 자릿수
		int retry; 	// 다시 한 번?
		char[] cno = new char[32];

		System.out.println("10진수를 기수로 변환");
		do {
			do {
				System.out.print("변환하는 음이 아닌 정수: ");
				no = sc.nextInt();
			}while(no < 0);

			do {
				System.out.print("몇 진수로 변환?: ");
				cd = sc.nextInt();
			}while(cd < 2 || cd > 36);

			dno = cardConvR(no, cd, cno);

			System.out.print("result: ");
			for(int i = dno - 1; i >= 0; i--) {
				System.out.print(cno[i]);
			}
			System.out.println();

			System.out.print("Try more? (1=yes / 0=no)");
			retry = sc.nextInt();
		}while(retry == 1);
	}
}
```

もしくは、
基数変換メソッドで配列の逆転させる方法もあります。

```java
	static int cardConvR(int x, int r, char[] d) {
		int digits = 0;
		String dchar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		do {
			d[digits++] = dchar.charAt(x % r);
			x /= r;

		} while (x != 0);

		for(int i = 0; i < digits / 2; i++) {
			char t = d[i];
			d[i] = d[digits-1-i];
			d[digits-1-i] = t;
		}
		return digits;
	}
```

この場合は、メインメソッドで結果を出力する時、ただ順番で出力してもオッケー！
