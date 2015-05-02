#include <stdio.h>

/*****************************************************/

/** Adds a number to a hashtable */
void addNum(ht_t H, int x) {
    ht_insert(H, (void*)&x);
}

/*****************************************************/

/** Returns my name */
char* getName() {
    char name[6];
    name[0]='m';
    name[1]='a';
    name[2]='t';
    name[3]='t';
    name[4]='\0';
    return name;
}


/*****************************************************/

typedef struct {
    int x;
    int y;
} point;

/** Initializes the point */
void initPoint(point p) {
    p.x = 0;
    p.y = 0;
}

void main() {
    point p;
    initPoint(p);
    p.x += 10;
    printf("Point is %d, %d", p.x, p.y);
}

/*****************************************************/

char *copyString(char *s) {
    char *new = malloc(strlen(s));
    strcpy(new, s);
    return new;
}

/*****************************************************/

void dogsRule(char *cats) {
    int len = strlen(cats);
    for (int i = 0; i < len - 2; i++) {
        if(cats[0] == 'c' && cats[1] == 'a' && cats[2] == 't') {
            cats[0] = 'd';
            cats[1] = 'o';
            cats[2] = 'g';
        }
        cats++;
    }
}

int main() {
    char *S = "I love cats!";
    dogsRule(S);
    printf("%s", S);
}

/*****************************************************/

int main() {
    stack S = stack_new();
    int *x = malloc(sizeof(int));
    *x = 3655;
    push(S, (void*)x);
    // Do some fancy stuff
    stack_free(S, &free);
    return *x;
}

