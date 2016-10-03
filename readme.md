# Issue with subscriptions

```
meteor npm install
meteor
```

Open http://localhost:3000

- Go into State A -> see `Loading...` then `Ready`
- Go into State B -> see `Loading...` , but never ready

works also if you start with State B


## `$reactive` free version:

Switch lines:
```
controller: StateController,
          // controller: StateControllerWithout$reactive,
```

```
controller: StateController,
          // controller: StateControllerWithout$reactive,
```
