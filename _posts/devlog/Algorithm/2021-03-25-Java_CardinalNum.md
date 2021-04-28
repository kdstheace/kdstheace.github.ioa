---
layout: post
title: "[JAVA/下]基数変換 with Array Only"
subtitle: "Java / Difficulty:下"
category: devlog
tags: algorithm
---

aa

```java
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
		int no;     //변환하는 정수
		int cd;     // 기수
		int dno;    // 변환 후의 자릿수
		int retry;  // 다시 한 번?
		char[] cno = new char[32];
	}
}
```
