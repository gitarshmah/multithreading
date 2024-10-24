import sys
import time
import threading

def sum_n(n, result):
    time.sleep(1)  # Simulating a long-running computation
    result.append(sum(range(1, n + 1)))

if __name__ == "__main__":
    n = int(sys.stdin.read().strip())
    result = []
    thread = threading.Thread(target=sum_n, args=(n, result))
    thread.start()
    thread.join()  # Wait for the thread to complete
    print(result[0])  # Print the result

